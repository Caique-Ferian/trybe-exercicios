import path from 'path';

import fs from 'fs/promises';

export interface IPlant {
  id: string,
  breed: string,
  needsSun: boolean,
  origin: string,
  size: number,
  specialCare?: { waterFrequency: number }
}

interface IOpsInfo { createdPlants: number }

class Plants {
  private PLANTS_PATH = path.join(__dirname, 'plantsData.json');
  private OPS_FILE_PATH = path.join(__dirname, 'opsInfo.json');

  public static initPlant(plant: IPlant): IPlant {
    const { id, breed, needsSun, origin, specialCare, size } = plant;
    const waterFrequency = needsSun
      ? size * 0.77 + (origin === 'Brazil' ? 8 : 7)
      : (size / 2) * 1.33 + (origin === 'Brazil' ? 8 : 7);

    const newPlant: IPlant = {
      id,
      breed,
      needsSun,
      origin,
      specialCare: {
        ...specialCare,
        waterFrequency,
      },
      size,
    };

    return newPlant;
  }

  public static async saveFile(pathFile: string, data: IPlant[] | IOpsInfo): Promise<void> {
    await fs.writeFile(pathFile, JSON.stringify(data));
  }

  public static async readFile<T>(pathFile: string): Promise<T> {
    const raw = await fs.readFile(pathFile, { encoding: 'utf8' });
    const result: T = JSON.parse(raw);
    return result;
  }

  public async updateObsFile(increment = 1): Promise<void> {
    let { createdPlants }: IOpsInfo = await Plants.readFile(this.OPS_FILE_PATH);
    createdPlants += increment;
    await Plants.saveFile(this.OPS_FILE_PATH, { createdPlants });
  }

  public async getPlants(): Promise<IPlant[]> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);
    return plants;
  }

  public async getPlantById(
    id: string,
  ): Promise<IPlant | null> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);

    const plantById = plants.find((plant) => plant.id === id);
    if (!plantById) return null;
    return plantById;
  }

  public async removePlantById(
    id: string,
  ): Promise<IPlant | null> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);

    const removedPlant = plants.find((plant) => plant.id === id);
    if (!removedPlant) return null;

    const newPlants = plants.filter((plant) => plant.id !== id);
    await this.updateObsFile(-1);
    await Plants.saveFile(this.PLANTS_PATH, newPlants);

    return removedPlant;
  }

  public async getPlantsThatNeedsSunWithId(
    id: string,
  ): Promise<IPlant[]> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);

    const filteredPlants = plants.filter((plant) =>
      plant.id === id
      && plant.needsSun
      && (!plant.specialCare
        || plant.specialCare.waterFrequency > 2));

    return filteredPlants;
  }

  public async editPlant(
    plantId: string,
    newPlant: IPlant,
  ): Promise<IPlant> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);

    const updatedPlants = plants.map((plant) => {
      if (plant.id === plantId) return newPlant;
      return plant;
    });

    await Plants.saveFile(this.PLANTS_PATH, updatedPlants);
    return newPlant;
  }

  public async savePlant(
    plant: IPlant,
  ): Promise<IPlant> {
    const plants: IPlant[] = await Plants.readFile(this.PLANTS_PATH);

    const newPlant = Plants.initPlant({ ...plant });
    plants.push(newPlant);

    await this.updateObsFile();
    await Plants.saveFile(this.PLANTS_PATH, plants);
    return newPlant;
  }
}

export default Plants;