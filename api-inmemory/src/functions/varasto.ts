import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from '@azure/functions';

const sqlVarastoOutput = output.sql({
  commandText: 'dbo.Varasto',
  connectionStringSetting: 'SqlConnectionString',
});

export async function varastoTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('HTTP + SQL for Varasto.');

  const body = await request.text();
  console.log("Varasto:", JSON.stringify(body));
  context.extraOutputs.set(sqlVarastoOutput, body);

  return { status: 201 };
}

app.http('varasto', {
  methods: ['POST'],
  authLevel: 'anonymous',
  extraOutputs: [sqlVarastoOutput],
  handler: varastoTrigger,
});