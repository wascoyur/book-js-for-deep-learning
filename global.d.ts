// global.d.ts
declare global {
  interface TfVersion {
    tfjs: string;
  }

  interface Tf {
    version: TfVersion;
    tensor2d: Array;
  }

  const tf: Tf; // Объявляем глобальную переменную tf
}

export {}; // Обеспечиваем, что файл является модулем
