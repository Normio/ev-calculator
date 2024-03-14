# Welcome to EV calculator

Some nice jargon

## Development

### Setup local supabase
Install supabase CLI

See the latest [doc](https://supabase.com/docs/guides/cli/getting-started?platform=windows) at supabase's doc 

#### Windows
> Note: you need to have **Docker desktop** installed and running

Install `Scoop` command-line installer by opening PowerShell and running

```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

Install `Supabase CLI`
```sh
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

Start local supabase environment by running at root of the project
```sh
supabase start
```

Stop the local supabase environment
```sh
supabase stop
```

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
