"use client";
import { ICounter, ICreateCounterRequest, IUpdateCounterRequest } from "@/interfaces/services/counter.interface";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import CounterCard from "../molecules/CounterCard";
import CounterForm from "../molecules/CounterForm";
import { useGetAllCounters, useCreateCounter, useUpdateCounter, useDeleteCounter } from "@/services/counter/wrapper.service";

const CounterManager: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCounter, setEditingCounter] = useState<ICounter | null>(null);

  const { data: countersResponse, isLoading: isLoadingCounters } = useGetAllCounters();
  const { mutate: createCounter, isPending: isCreating } = useCreateCounter();
  const { mutate: updateCounter, isPending: isUpdating } = useUpdateCounter();
  const { mutate: deleteCounter, isPending: isDeleting } = useDeleteCounter();

  const counters = countersResponse?.data || [];

  const handleSubmit = (data: ICreateCounterRequest | IUpdateCounterRequest) => {
    if (editingCounter) {
      updateCounter({ id: editingCounter.id, ...data }, {
        onSuccess: () => setEditingCounter(null)
      });
    } else {
      createCounter(data, {
        onSuccess: () => setIsAdding(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this counter?")) {
        deleteCounter(id);
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingCounter(null);
  };

  return (
    <div>
      <Card className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manajemen Counter</h2>
            <p className="text-gray-600 mt-1">Kelola counter/loket pelayanan</p>
          </div>
          {!isAdding && !editingCounter && (
            <Button onClick={() => setIsAdding(true)} leftIcon={<span className="material-symbols-outlined">add</span>}>
              Tambah Counter
            </Button>
          )}
        </div>
      </Card>

      {isAdding || editingCounter ? (
        <Card>
          <h3 className="text-lg font-semibold mb-4">{editingCounter ? "Edit Counter" : "Tambah Counter Baru"}</h3>
          <CounterForm
            counter={editingCounter || undefined}
            onSubmit={handleSubmit}
            isLoading={isCreating || isUpdating}
            isEditMode={!!editingCounter}
          />
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={closeForm}>Batal</Button>
          </div>
        </Card>
      ) : (
        <>
          {isLoadingCounters ? (
            <p>Loading counters...</p>
          ) : counters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {counters.map((counter) => (
                <div key={counter.id}>
                    <CounterCard counter={counter} />
                    <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingCounter(counter)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(counter.id)} isLoading={isDeleting}>Hapus</Button>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <Card variant="outline" className="text-center py-8 text-gray-500">
              Belum ada counter. Klik Tambah Counter untuk membuat counter baru.
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CounterManager;