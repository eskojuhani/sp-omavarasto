import { app, HttpRequest, HttpResponseInit, input, InvocationContext, output } from '@azure/functions';

/* Varasto - Create */

const sqlVarastoCreate = output.sql({
  commandText: 'dbo.Varasto',
  connectionStringSetting: 'SqlConnectionString',
});

export async function varastoInsert(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('HTTP + SQL for Varasto.');

  const body = await request.text();
  console.log("Varasto:", JSON.stringify(body));
  context.extraOutputs.set(sqlVarastoCreate, body);

  return { status: 201 };
}

app.http('varasto', {
  methods: ['POST'],
  authLevel: 'anonymous',
  extraOutputs: [sqlVarastoCreate],
  handler: varastoInsert,
});

/* Varasto - Delete */

const sqlDeleteOne = input.generic({
  type: 'sql',
  commandText: 'delete from dbo.Varasto where Id = @Id',
  commandType: 'Text',
  parameters: '@Id={id}',
  connectionStringSetting: 'SqlConnectionString'
})

app.http('varasto', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'varasto/{id}',
  extraInputs: [sqlDeleteOne],
  handler: async (request, context) => {
      const products = JSON.stringify(context.extraInputs.get(sqlDeleteOne));
      console.log("products", products);
      return {
          status: 201
      };
  }
});

/* Varastot - GetAll */
const sqlGetAll = input.generic({
    type: 'sql',
    commandText: 'select * from dbo.Varasto where OrganisaatioId = @Id',
    commandType: 'Text',
    parameters: '@Id={id}',
    connectionStringSetting: 'SqlConnectionString'
})

app.http('varasto', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'varasto/{id}',
    extraInputs: [sqlGetAll],
    handler: async (request, context) => {
        const products = JSON.stringify(context.extraInputs.get(sqlGetAll));

        return {
            status: 200,
            body: products
        };
    }
});

/*  */