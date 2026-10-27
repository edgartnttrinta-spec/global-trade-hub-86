# Notificações de pedidos de cotação

A Edge Function `notify-quote` está publicada no projecto Supabase `mflvcffxgzystwqkloxk`. Ela guarda o pedido em `quote_requests` e tenta enviar notificações por e-mail e WhatsApp. O registo na base de dados é preservado mesmo se um dos fornecedores de mensagens falhar.

## Segredos da Edge Function

No Supabase Dashboard, abra a secção de **Edge Function Secrets** e configure os valores abaixo. Não os coloque no GitHub nem os envie no chat.

### E-mail (Resend)
- `RESEND_API_KEY`: chave API criada na conta Resend.
- `RESEND_FROM_EMAIL`: remetente num domínio verificado no Resend.
- `QUOTE_NOTIFICATION_EMAIL`: destino de notificação; usar `comercial@globaltrade.co.mz`.

É necessário verificar o domínio remetente no Resend antes de enviar notificações para destinatários externos em produção.

### WhatsApp Business Cloud API (Meta)
- `WHATSAPP_ACCESS_TOKEN`: token de acesso da aplicação WhatsApp Business.
- `WHATSAPP_PHONE_NUMBER_ID`: Phone Number ID do número remetente na Meta.
- `WHATSAPP_TO_NUMBER`: número de destino em formato internacional só com dígitos, sem `+` nem espaços.
- `WHATSAPP_TEMPLATE_NAME`: nome exacto de um modelo de mensagem aprovado na WhatsApp Business Platform, com cinco variáveis no corpo, pela ordem: referência, nome do cliente, produto, telefone do cliente e e-mail do cliente.
- `WHATSAPP_TEMPLATE_LANGUAGE`: código de idioma aprovado para o modelo, por exemplo `pt_BR` ou `pt_PT`, conforme a configuração aprovada.

A WhatsApp Business Platform normalmente exige um modelo aprovado para mensagens iniciadas pela empresa fora da janela de atendimento. Criar/aprovar o modelo e obter credenciais da Meta é um passo externo necessário.

### Domínios autorizados
- `ALLOWED_ORIGIN`: origem principal do website, por exemplo `https://www.globaltrade.co.mz`.
- `ALLOWED_ORIGINS`: lista opcional separada por vírgulas com origens exactas adicionais, como domínio de produção e preview do website.

## Fluxo actual
1. O formulário chama `notify-quote`.
2. A função valida os campos essenciais e guarda o pedido no Supabase.
3. Tenta enviar o e-mail e o modelo de WhatsApp.
4. A resposta indica se cada notificação foi enviada ou se ainda falta configuração.

## Importante
- O endpoint é público porque é chamado pelo formulário público. CORS não é autenticação. Antes de campanha pública, adicionar rate limiting/anti-spam (por exemplo Turnstile e limitação por IP) e monitorização.
- `SUPABASE_SERVICE_ROLE_KEY` é fornecida pelo ambiente de Edge Functions e nunca deve ser enviada ao browser.
- Não considerar as notificações operacionais até configurar os segredos, testar um envio real de e-mail e confirmar a entrega por WhatsApp.
