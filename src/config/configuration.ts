import yaml from './yaml.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

export default async () => {
    const yamlConfig = await yaml();
    return yamlConfig;
};
