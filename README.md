<div dir="rtl">

# پروژه یادداشت

## چطوری بخش مورد نظرمون رو دانلود کنیم

1- اول بخش مورد نظرتون رو از طریق کلیک روی branches انتخاب کنید، مثلا برای ابتدای پروژه، start رو انتخاب کنید.

2- روی دکمه ی سبز رنگ Code کلیک کنید و بعدش روی Download Zip کلیک کنید.

## اگر Git بلد هستم چطوری پروژه رو دانلود کنم؟

1- با اجرای دستور زیر، پروژه رو Clone کنید:

```bash

git clone https://github.com/navidesma/react_tutorial_todo_app.git

```

2- برید داخل پوشه ی پروژه، بعدش اگر مثلا میخوام ابتدای پروژه رو ببینم:

```bash

git checkout branch start

```

3- اگر بخوام به آخرین تغییرات برگردم

```bash

git checkout main

```

## چطوری Dependency ها رو نصب کنیم؟

1- با Powershell یا CMD وارد پوشه ی پروژه بشید

اگر از pnpm استفاده می کنید

دستور زیر رو اجرا کنید:

```bash

pnpm install

```

اگر از npm استفاده می کنید:

دستور زیر رو اجرا کنید:

```bash

npm install
```

و بعدش دستور زیر رو بزنید که اجرا بشه:

```bash

npm start

```

## اگر بخواهیم پروژه رو روی پورتی غیر از پورت 5173 اجرا کنیم باید چیکار کنیم؟

برید داخل فایل: `vite.config.ts` یا `vite.config.js`:

مثلا من میخوام پورت 3000 رو استفاده کنم:

```typescript
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        port: 3000,
    },
});
```
