import { FulfillmentResponse } from '@dialogflow/interface/fulfillment-response.interface';
import { SessionsClient } from '@google-cloud/dialogflow';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Injectable()
export class DialogflowService {
  private sessionClient: SessionsClient;
  private sessionPath: string;

  constructor(private readonly configService: ConfigService) {}

  initialize() {
    this.sessionClient = new SessionsClient();
    this.sessionPath = this.sessionClient.projectAgentSessionPath(
      this.configService.get<string>('DIALOGFLOW_PROJECT_ID'),
      v4(),
    );
  }

  async detectIntent(text: string): Promise<FulfillmentResponse | null> {
    const request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'es',
        },
      },
    };

    const responses = await this.sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (result.intent) {
      return {
        fulfillmentText: result.fulfillmentText,
        intent: result.intent?.displayName,
      };
    } else {
      return null;
    }
  }
}
