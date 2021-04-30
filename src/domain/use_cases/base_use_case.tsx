export default abstract class BaseUseCase<Request, Response> {
  abstract execute(request?: Request): Promise<Response>;
}
