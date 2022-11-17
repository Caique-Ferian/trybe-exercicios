import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.union([z.literal('Street'), z.literal('Custom'), z.literal('Trail')]),
  engineCapacity: z.number().positive().lte(2500),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { IMotorcycle };
export default motorcycleZodSchema;