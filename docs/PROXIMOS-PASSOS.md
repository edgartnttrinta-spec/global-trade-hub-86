# Estado de implementação — Global Trade & Services, Lda

## Implementado nesta etapa
- Página inicial alinhada com o nome e slogan oficiais.
- Portefólio de oito marcas, com áreas de negócio, e-mails e slogans fornecidos.
- Páginas individuais das marcas através da rota dinâmica de portefólio.
- Catálogo de categorias com pesquisa e filtros por marca e categoria; não apresenta stock ou produtos fictícios como disponíveis.
- Contactos oficiais e ligações de e-mail directas.
- Pedido de cotação com validação do navegador, referência gerada no frontend e preparação de mensagem para o programa de e-mail do visitante.
- Página preliminar de privacidade e entrada no sitemap.
- Áreas reservadas para os logótipos oficiais quando os ficheiros originais não estão disponíveis no projecto.

## Configuração ainda necessária antes da publicação
1. **Logótipos:** adicionar os oito ficheiros oficiais e associá-los às marcas sem alterar cores, proporções ou composição.
2. **Envio de e-mail:** configurar um serviço transaccional do lado do servidor e guardar credenciais em variáveis de ambiente. O fluxo actual abre mailto e não confirma envio nem persiste o pedido.
3. **Base de dados e administração:** configurar o projecto Supabase, tabelas, autenticação, permissões/RLS, armazenamento e um painel administrativo real. Não existe nesta etapa um painel de administração com persistência.
4. **Anexos:** implementar upload do lado do servidor ou storage privado com validação de tipo, tamanho, permissões e regras de acesso. Por agora, anexos devem ser adicionados manualmente ao e-mail.
5. **Privacidade:** rever o texto preliminar com os procedimentos reais da empresa e validação adequada antes da publicação.
6. **SEO e domínio:** confirmar canonical URLs, domínio activo, metadados, sitemap e robots.txt no ambiente de publicação.
7. **Verificação:** executar npm run build, npm run lint e npm test, corrigir eventuais erros e testar navegação, formulários e comportamento móvel no ambiente Lovable.

## Dados comerciais
Os preços, stock, especificações, disponibilidade, prazos, marcas representadas e certificações devem ser publicados apenas depois de confirmados pela empresa. Os logótipos oficiais não devem ser substituídos por ícones genéricos.
