import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => {

    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint key", () => {
        expect(configuration.apiKey).toBe("12345");
    });

    test("endpoint /palindromo", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /primo", () => {
        expect(1 + 1).toBe(2);
    });

    test("test de endpoint /key", async () => {
        return await request(app)
            .get("/key")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
            })
    });
    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });
    test("test de endpoint palindromo", async () => {
        return await request(app)
            .get("/palindromo/oso")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe('Hola, La frase ingresada es palindromo');
            })
    });
    test("test de endpoint no es palindromo", async () => {
        return await request(app)
            .get("/palindromo/gato")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe('Hola, La frase no ingresada es palindromo');
            })
    });

    test("test de endpoint primo", async () => {
        return await request(app)
            .get("/primo/7")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe('Hola, el numero ingresado es un numero primo');
            })
    });
    test("test de endpoint no es primo", async () => {
        return await request(app)
            .get("/primo/8")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe('Hola, el numero ingresado no es un numero primo');
            })
    });
    test("test de endpoint menor de 2", async () => {
        return await request(app)
            .get("/primo/1")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe('Hola, el numero ingresado no es un numero primo');
            })
    });




})