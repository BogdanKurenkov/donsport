import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist', // Директория вывода после сборки
        assetsDir: 'assets', // Директория для статических ресурсов
        emptyOutDir: true, // Очищать директорию вывода перед сборкой
        rollupOptions: {
            input: 'index.html' // Главный входной файл
        }
    },
    base: './', // Базовый путь для ресурсов
    server: {
        port: 3000, // Порт для локального сервера
        open: true // Автоматически открывать браузер при запуске
    }
});