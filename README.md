# biletiki.vanilla-calendar.pro

An open-source website for searching flights and hotels using the [vanilla-calendar-pro](https://github.com/uvarov-frontend/vanilla-calendar-pro) plugin.

## About

This is a demonstration project for the [vanilla-calendar-pro](https://github.com/uvarov-frontend/vanilla-calendar-pro) plugin, which offers a convenient interface for searching and booking tickets. The design and the name "Biletiki" were inspired by the "aviasales.ru" website.

**Technologies Used:**

- Next.js
- React
- Next-intl
- TypeScript
- Tailwind CSS

## Production Docker Run

```sh
docker build --no-cache -t biletiki_vanilla_calendar_pro . \
  && docker rm -f -v biletiki_vanilla_calendar_pro 2>/dev/null || true \
  && docker run -d \
    --name biletiki_vanilla_calendar_pro \
    --restart unless-stopped \
    -e NODE_ENV=production \
    -e PORT=3401 \
    -p 127.0.0.1:3401:3401 \
    biletiki_vanilla_calendar_pro
```

Bind the container to `127.0.0.1` and proxy it through `nginx`. Do not publish
`3401` on `0.0.0.0` in production.
