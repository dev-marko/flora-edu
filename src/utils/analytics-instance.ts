// analytics.js
import ArticlesApi from '@/apis/blog-api';
import PlantsApi from '@/apis/plants-api';
import { FeatureEntities } from '@/data/enums/feature-entities';
import Analytics from 'analytics';

const myPlugin = {
  name: 'my-custom-plugin',
  page: ({ payload }: any) => {
    const endpoint: FeatureEntities = payload.properties.endpoint;
    switch (endpoint) {
      case FeatureEntities.Article:
        ArticlesApi.registerUniqueVisitor({
          uuaid: payload.anonymousId,
          entityId: payload.properties.articleId,
        });
        break;
      case FeatureEntities.Plant:
        PlantsApi.registerUniqueVisitor({
          uuaid: payload.anonymousId,
          entityId: payload.properties.plantId,
        });
        break;
    }
  },
};

const analyticsInstance = Analytics({
  app: 'my-app',
  plugins: [myPlugin],
});

export default analyticsInstance;
