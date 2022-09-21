import express, { Request, Response } from 'express';
import Plants, { IPlant } from './Plants';

const app = express();

const PlantModel = new Plants();

app.use(express.json());

const PORT = 3000;
const ERROR_MESSAGE = 'Plant not found';
const ROUT_BY_ID = '/plants/:id';

app.get('/plants', async (_req:Request, res:Response) => {
    const plants = await PlantModel.getPlants();
    return res.status(200).json(plants);
});

app.get(ROUT_BY_ID, async (req:Request, res:Response) => {
    const { id } = req.params;
    const plant = await PlantModel.getPlantById(id);
    if (!plant) return res.status(404).json({ message: ERROR_MESSAGE });
    return res.status(200).json(plant);
});

app.get('/sunny/:id', async (req:Request, res:Response) => {
    const { id } = req.params;
    const [sunnyPlant] = await PlantModel.getPlantsThatNeedsSunWithId(id);
    if (!sunnyPlant) return res.status(404).json({ message: ERROR_MESSAGE });
    return res.status(200).json(sunnyPlant);
});

app.post('/plants', async (req:Request, res:Response) => {
    const { id, breed, needsSun, origin, size, specialCare } = req.body;
    const newPlant = await PlantModel.savePlant(
        { id, breed, needsSun, origin, size, specialCare },
    );
    return res.status(201).json(newPlant);
});

app.post(ROUT_BY_ID, async (req:Request, res:Response) => {
    const { id, breed, needsSun, origin, size, specialCare } = req.body;
    const updatedPlant = await PlantModel.editPlant(req.params.id,
        { id, breed, needsSun, origin, size, specialCare });
    if (!updatedPlant) return res.status(404).json({ message: ERROR_MESSAGE });
    return res.status(200).json(updatedPlant);
});

app.delete(ROUT_BY_ID, async (req:Request, res:Response) => {
    const { id } = req.params;
    const removedPlant = await PlantModel.removePlantById(id);
    if (!removedPlant) return res.status(404).json({ message: ERROR_MESSAGE });
    return res.status(204).json(removedPlant);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));