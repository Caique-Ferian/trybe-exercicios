interface IModel<T> {
  create(obj: Partial<T>): Promise<T>,
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T | null>,
  update(_id: string, obj: Partial<T>): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
}

export { IModel };
export default IModel;