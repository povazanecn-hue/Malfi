import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { review_id } = await req.json();

    if (!review_id) {
      return Response.json({ error: 'Missing review_id' }, { status: 400 });
    }

    const review = await base44.asServiceRole.entities.Review.filter({ id: review_id }).then(r => r[0]);
    
    if (!review) {
      return Response.json({ error: 'Review not found' }, { status: 404 });
    }

    const stars = '⭐'.repeat(review.rating);

    await base44.integrations.Core.SendEmail({
      to: review.customer_email,
      subject: 'Ďakujeme za vašu recenziu! 🫒 MALFI',
      body: `
Ďakujeme, ${review.customer_name}! ❤️

Vaša recenzia bola úspešne prijatá:

${stars} ${review.rating}/5

"${review.comment}"

Vaša spätná väzba nám pomáha zlepšovať sa. Tešíme sa, až vás uvidíme znova v MALFI!

S úctou,
MALFI Talianska Reštaurácia
Hurbanovo námestie 1, Bratislava
+421 900 000 000
info@malfi.sk
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});