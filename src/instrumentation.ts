import {NodeSDK} from '@opentelemetry/sdk-node';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http';
import {Resource} from '@opentelemetry/resources';
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions';
import {getNodeAutoInstrumentations} from '@opentelemetry/auto-instrumentations-node';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'stb-quotation-app',
        [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
      }),
      traceExporter: new OTLPTraceExporter({
        // You can configure the endpoint for your OpenTelemetry collector here.
        // For example, if you're running a local collector:
        // url: 'http://localhost:4318/v1/traces',
        // Headers can be used for authentication.
        // headers: {},
      }),
      instrumentations: [getNodeAutoInstrumentations()],
    });
    
    sdk.start();
    console.log('OpenTelemetry SDK started for Node.js runtime.');
  } else if (process.env.NEXT_RUNTIME === 'edge') {
      console.log('OpenTelemetry not configured for Edge runtime.');
  }
}
