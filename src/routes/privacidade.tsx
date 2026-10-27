import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [
    { title: "Privacidade e dados | Global Trade & Services, Lda" },
    { name: "description", content: "Informações preliminares sobre a utilização de dados pessoais no website da Global Trade & Services, Lda." },
    { name: "robots", content: "index,follow" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <>
    <PageHero eyebrow="Privacidade" title="Privacidade e utilização de dados">Esta página apresenta uma informação preliminar e deve ser revista pela empresa antes da publicação definitiva, de acordo com os processos reais de tratamento de dados.</PageHero>
    <section className="section-shell max-w-4xl space-y-10 py-16 sm:py-20">
      <section><h2 className="font-display text-2xl font-semibold">1. Responsável e contacto</h2><p className="mt-3 leading-7 text-ink-soft">O website identifica a Global Trade & Services, Lda, em Maputo, Moçambique, como entidade institucional. Para questões sobre privacidade, contacte geral@globaltrade.co.mz.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">2. Dados introduzidos pelo visitante</h2><p className="mt-3 leading-7 text-ink-soft">Os formulários de contacto e cotação podem solicitar dados como nome, empresa, e-mail, telefone, país e detalhes do pedido. Não introduza dados pessoais desnecessários ou informação confidencial no campo de observações.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">3. Funcionamento actual dos formulários</h2><p className="mt-3 leading-7 text-ink-soft">Actualmente, o formulário de cotação prepara uma mensagem no programa de e-mail do visitante. O website não confirma o envio da mensagem, não guarda automaticamente o pedido numa base de dados e não disponibiliza carregamento seguro de anexos. O visitante deve confirmar e enviar a mensagem no seu programa de e-mail.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">4. Finalidade comercial</h2><p className="mt-3 leading-7 text-ink-soft">Quando um visitante decide enviar uma mensagem, os dados nela incluídos destinam-se a permitir a resposta à consulta comercial ou institucional. Os prazos de conservação, as pessoas com acesso e os procedimentos de eliminação devem ser definidos e validados pela empresa antes da publicação.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">5. Serviços externos e segurança</h2><p className="mt-3 leading-7 text-ink-soft">Os links de e-mail abrem uma aplicação externa escolhida pelo visitante. A integração de base de dados, autenticação administrativa, armazenamento de ficheiros, registos de consentimento e protecção anti-spam ainda requer configuração técnica e revisão. Não se declara aqui qualquer certificação de segurança ou conformidade jurídica.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">6. Revisão antes da publicação</h2><p className="mt-3 leading-7 text-ink-soft">Este texto é um ponto de partida e não substitui uma revisão jurídica. A versão final deve reflectir os processos reais da empresa, as ferramentas activas, os contactos responsáveis, os prazos de conservação e os direitos aplicáveis aos titulares dos dados.</p></section>
    </section>
  </>;
}
