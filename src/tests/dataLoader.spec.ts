import { test, expect } from "@playwright/test";
import { dataLoader } from "../tasks/2-3/helpers";
import fs from "fs";
import path from "path";

const csvFilePath = path.join(__dirname, "test_data_loader.csv");

test.describe("Data Loader Tests", () => {
  test("should load and parse data correctly", async () => {
    const addresses = [csvFilePath]; // Массив с адресами CSV файлов

    const results = await dataLoader(addresses);

    // Проверяем, что результат не пустой
    expect(results).not.toBeNull();
    expect(results.length).toBeGreaterThan(0);

    // Проверяем структуру первого элемента результата
    const firstResult = results[0];
    expect(firstResult).toHaveProperty("CRIM");
    expect(firstResult).toHaveProperty("ZN");
    expect(firstResult).toHaveProperty("INDUS");
    expect(firstResult).toHaveProperty("CHAS");
    expect(firstResult).toHaveProperty("NOX");
    expect(firstResult).toHaveProperty("RM");
    expect(firstResult).toHaveProperty("AGE");
    expect(firstResult).toHaveProperty("DIS");
    expect(firstResult).toHaveProperty("RAD");
    expect(firstResult).toHaveProperty("TAX");
    expect(firstResult).toHaveProperty("PTRATIO");
    expect(firstResult).toHaveProperty("B");
    expect(firstResult).toHaveProperty("LSTAT");
    expect(firstResult).toHaveProperty("MEDV");

    // Проверяем типы значений
    expect(typeof firstResult.CRIM).toBe("number");
    expect(typeof firstResult.ZN).toBe("number");
    expect(typeof firstResult.INDUS).toBe("number");
    expect(typeof firstResult.CHAS).toBe("number");
    expect(typeof firstResult.NOX).toBe("number");
    expect(typeof firstResult.RM).toBe("number");
    expect(typeof firstResult.AGE).toBe("number");
    expect(typeof firstResult.DIS).toBe("number");
    expect(typeof firstResult.RAD).toBe("number");
    expect(typeof firstResult.TAX).toBe("number");
    expect(typeof firstResult.PTRATIO).toBe("number");
    expect(typeof firstResult.B).toBe("number");
    expect(typeof firstResult.LSTAT).toBe("number");
    expect(typeof firstResult.MEDV).toBe("number");
  });

  test.afterAll(async () => {
    // Удаляем тестовый файл после выполнения тестов
    if (fs.existsSync(csvFilePath)) {
      fs.unlinkSync(csvFilePath);
    }
  });
});
