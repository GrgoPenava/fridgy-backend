# Osnovna slika s Node.js-om
FROM node:20-alpine

# Postavi radni direktorij
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj ovisnosti
RUN npm install
RUN ls -la # Provjera: jesu li package.json i node_modules tu?

# Kopiraj tsconfig.json i Prisma datoteke
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN ls -la # Provjera: je li tsconfig.json kopiran?

# Generiraj Prisma klijent
RUN npx prisma generate
RUN ls -la prisma/ # Provjera: jesu li Prisma datoteke tu?

# Kopiraj izvorni kod
COPY src ./src/
RUN ls -la src/ # Provjera: jesu li src datoteke kopirane?

# Očisti stari dist i kompajliraj Typescript u Javascript
RUN rm -rf dist/ && npm run build
RUN ls -la dist/ || echo "Error: dist directory not created" # Provjera: je li dist stvoren?

# Pokreni aplikaciju
CMD ["npm", "start"]

# Eksponiraj port
EXPOSE 3000