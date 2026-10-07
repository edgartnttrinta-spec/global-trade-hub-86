import { Cpu, HardHat, IceCreamBowl, PackageSearch, Ship, Tractor, Truck, Wheat } from "lucide-react";

export const companies = [
  { slug: "global-trade-services", number: "01", name: "Global Trade & Services, Lda", short: "Global Trade", area: "Comércio, fornecimento, importação, exportação e soluções empresariais.", category: "Comércio & Procurement", accent: "trade", icon: PackageSearch, image: "logistics" },
  { slug: "globaltech-supplies", number: "02", name: "GlobalTech Supplies", short: "GlobalTech", area: "Tecnologia, equipamentos e soluções profissionais.", category: "Tecnologia", accent: "tech", icon: Cpu, image: "technology" },
  { slug: "global-agro-tractor-supplies", number: "03", name: "Global Agro Tractor Supplies", short: "Global Agro", area: "Tratores, máquinas, implementos e soluções agrícolas.", category: "Agricultura", accent: "agro", icon: Tractor, image: "agriculture" },
  { slug: "global-safety", number: "04", name: "Global Safety", short: "Global Safety", area: "Equipamentos de proteção individual e segurança para ambientes de trabalho.", category: "Segurança", accent: "safety", icon: HardHat, image: "technology" },
  { slug: "global-express-go", number: "05", name: "Global Express GO", short: "Express GO", area: "Logística, transporte, entregas, importação e exportação.", category: "Logística", accent: "express", icon: Ship, image: "logistics" },
  { slug: "crystal-ice", number: "06", name: "Crystal Ice", short: "Crystal Ice", area: "Produção, fornecimento e distribuição de gelo.", category: "Produção & Distribuição", accent: "ice", icon: IceCreamBowl, image: "technology" },
  { slug: "ponto-das-aves", number: "07", name: "Ponto das Aves", short: "Ponto das Aves", area: "Avicultura e soluções para aves e produção avícola.", category: "Avicultura", accent: "birds", icon: Wheat, image: "agriculture" },
  { slug: "global-auto-mobility", number: "08", name: "Global Auto Mobility", short: "Auto Mobility", area: "Automóveis, mobilidade, importação e soluções automotivas.", category: "Mobilidade", accent: "auto", icon: Truck, image: "logistics" },
] as const;

export const companyCategories: Record<string, string[]> = {
  "global-trade-services": ["Comércio e fornecimento", "Importação e exportação", "Procurement", "Sourcing", "Equipamentos", "Soluções empresariais"],
  "globaltech-supplies": ["Computadores", "Laptops", "Monitores", "Impressoras", "Redes", "Telecomunicações", "Videoconferência", "Energia e UPS", "Infraestrutura tecnológica"],
  "global-agro-tractor-supplies": ["Tratores", "Máquinas agrícolas", "Implementos agrícolas", "Pulverizadores", "Semeadoras", "Charruas", "Grades", "Peças e acessórios"],
  "global-safety": ["Capacetes", "Óculos de proteção", "Proteção auditiva", "Proteção respiratória", "Luvas", "Calçado de segurança", "Vestuário de proteção", "Sinalização"],
  "global-express-go": ["Transporte", "Logística", "Entregas", "Carga", "Importação", "Exportação", "Distribuição", "Soluções logísticas empresariais"],
  "crystal-ice": ["Gelo", "Produtos de gelo", "Fornecimento", "Distribuição"],
  "ponto-das-aves": ["Aves", "Produtos avícolas", "Equipamentos", "Alimentação", "Soluções para produção avícola"],
  "global-auto-mobility": ["Automóveis", "SUVs", "Pick-ups", "Veículos comerciais", "Veículos para empresas", "Peças", "Acessórios", "Serviços automotivos"],
};

export const solutions = ["Comércio e Fornecimento", "Tecnologia", "Agricultura", "Segurança", "Logística", "Energia", "Importação e Exportação", "Procurement"];