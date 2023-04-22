import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `resources/config/application-${process.env.DEPLOY_ENV}.yml`;

export default async () => {
    const data = (await yaml.load(
        readFileSync(join(process.cwd(), YAML_CONFIG_FILENAME), 'utf8'),
    )) as Record<string, any>;
    return data;
};
