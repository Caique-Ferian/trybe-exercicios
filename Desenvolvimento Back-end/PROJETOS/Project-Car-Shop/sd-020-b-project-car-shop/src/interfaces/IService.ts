export type IResponse<T> = {
  code: number,
  documents?: T | T[],
};

interface IService<T> {
  create(obj: Partial<T>): Promise<IResponse<T>>,
  read(): Promise<IResponse<T>>,
  readOne(_id: string): Promise<IResponse<T>>,
  update(_id: string, obj: Partial<T>): Promise<IResponse<T>>,
  delete(_id: string): Promise<IResponse<T>>,
}
  
export default IService;