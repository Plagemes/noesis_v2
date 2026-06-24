# Script per aggiungere GlobalKPICards a tutte le pagine
for page in servizi turni operatori timesheet amministrazione alert commesse; do
  file="src/app/$page/page.tsx"
  # Aggiungi import se non esiste
  if ! grep -q "GlobalKPICards" "$file"; then
    sed -i "s/import { PageHeader }/import { PageHeader } from '@\/components\/PageHeader';\nimport { GlobalKPICards }/g" "$file"
    sed -i "s/from '@\/components\/PageHeader';/from '@\/components\/PageHeader';\nimport { GlobalKPICards } from '@\/components\/GlobalKPICards';/g" "$file"
    # Aggiungi componente dopo PageHeader
    sed -i '/<PageHeader/,/\/>/a\      <GlobalKPICards />' "$file"
    echo "Updated $page"
  fi
done
