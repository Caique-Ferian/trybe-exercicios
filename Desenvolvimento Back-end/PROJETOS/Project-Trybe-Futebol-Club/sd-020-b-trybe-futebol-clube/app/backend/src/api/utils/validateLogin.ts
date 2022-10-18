export default class ValidateLogin {
  public static validateFields(email: string, password: string): boolean {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (!email || !password || password.length < 6 || !emailRegex.test(email)) return false;
    return true;
  }
}
