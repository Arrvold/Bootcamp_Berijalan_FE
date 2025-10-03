import * as yup from 'yup'

export const VCounterSchema = yup.object().shape({
  name: yup.string().required('Nama counter wajib diisi'),
  maxQueue: yup // Ubah dari max_queue
    .number()
    .required('Deskripsi counter wajib diisi')
    .min(1, 'Antrian maksimal harus minimal 1')
    .typeError('Antrian maksimal harus berupa angka'),
  isActive: yup.boolean().required('Status counter wajib diisi'), // Ubah dari is_active
})

export type ICounterSchema = yup.InferType<typeof VCounterSchema>

export const VReleaseQueueSchema = yup.object().shape({
  queueNumber: yup.string().required('Nomor antrian wajib diisi'),
})

export type IReleaseQueueSchema = yup.InferType<typeof VReleaseQueueSchema>
