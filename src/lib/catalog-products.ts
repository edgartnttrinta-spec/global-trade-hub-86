import { companies, companyCategories } from "@/lib/site-data";

export type CatalogProduct = {
  slug: string;
  name: string;
  companySlug: string;
  companyName: string;
  companyShort: string;
  category: string;
  description: string;
  imageLabel: string;
};

const descriptions: Record<string, string> = {
  "global-trade-services": "Produtos e equipamentos para empresas, instituições e projectos. Envie a referência técnica, quantidade e requisitos para uma consulta comercial.",
  "globaltech-supplies": "Equipamentos de tecnologia e informática para uso pessoal e profissional. Modelo, configuração, disponibilidade e preço são confirmados mediante consulta.",
  "global-agro-tractor-supplies": "Máquinas, tractores e implementos para apoiar diferentes operações agrícolas. A compatibilidade e as especificações devem ser confirmadas antes da aquisição.",
  "global-safety": "Equipamentos e materiais de protecção para ambientes de trabalho. Indique normas, tamanhos, classe de protecção e quantidades pretendidas.",
  "global-express-go": "Serviços logísticos e de transporte sujeitos à análise do percurso, volume, peso e prazo pretendido.",
  "crystal-ice": "Fornecimento de gelo mediante consulta de quantidade, formato, local e data de entrega.",
  "ponto-das-aves": "Aves e soluções de fornecimento mediante confirmação de disponibilidade, quantidade e data pretendida.",
  "global-auto-mobility": "Soluções de importação, venda e aluguer de viaturas. Modelo, ano, condição e disponibilidade são confirmados por consulta.",
};

export const catalogProducts: CatalogProduct[] = companies.flatMap((company) =>
  (companyCategories[company.slug] ?? []).map((category) => ({
    slug: `${company.slug}--${category.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    name: category,
    companySlug: company.slug,
    companyName: company.name,
    companyShort: company.short,
    category,
    description: descriptions[company.slug] ?? "Categoria disponível para consulta comercial. Envie os requisitos para confirmação das opções adequadas.",
    imageLabel: category,
  })),
);

export function getCatalogProduct(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}
