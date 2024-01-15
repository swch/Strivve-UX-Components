class EncryptionUtilityClass {
  private key: number;

  constructor(key: number) {
    this.key = key;
  }

  private applyEncryption(text: any): string {
    return [...text]
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ this.key))
      .join('');
  }

  private applyDecryption(encryptedText: string): string {
    return atob(encryptedText)
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ this.key))
      .join('');
  }

  encrypt(text: string): string {
    const encryptedText = this.applyEncryption(text);
    return btoa(encryptedText);
  }

  decrypt(encryptedText: string): string {
    const decryptedText = this.applyDecryption(encryptedText);
    return decryptedText;
  }
}

export const EncryptionUtility = new EncryptionUtilityClass(10);