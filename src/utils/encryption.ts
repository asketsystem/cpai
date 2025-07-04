import bcrypt from 'bcryptjs';

export class Encryption {
  private static readonly SALT_ROUNDS = 12;

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(payload: any): string {
    // Simple token generation - in production, use proper JWT library
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return Buffer.from(`${timestamp}.${random}.${JSON.stringify(payload)}`).toString('base64');
  }

  static verifyToken(token: string): any {
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const parts = decoded.split('.');
      if (parts.length >= 3 && parts[2]) {
        return JSON.parse(parts[2]);
      }
      throw new Error('Invalid token format');
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 