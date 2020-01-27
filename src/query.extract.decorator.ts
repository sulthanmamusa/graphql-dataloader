import { createParamDecorator } from '@nestjs/common';
import * as pluralize from 'pluralize';
import { oneToManyLoader, oneToManyCountLoader, manyToOneLoader } from './base.loader';

export const QueryExtract = createParamDecorator((data, [root, args, ctx, info]) => {
    const projects = ['id'];
    info.fieldNodes[0].selectionSet.selections.forEach(item => {
        if(item.kind === 'Field'){
            if(item.selectionSet){
                projects.push(pluralize.isSingular(item.name.value) ? item.name.value+'_id' : 'id');
            } else {
                projects.push(item.name.value);
            }
        } else if(item.kind === 'FragmentSpread') {
            info.fragments[item.name.value].selectionSet.selections.forEach(item => projects.push(item.name.value));
        }
    });
    return projects.filter(item => !(item.endsWith('Count') || item === '__typename'));
});

export const ResolvePropertyExtract = createParamDecorator((data, [root, args, ctx, info]) => {
	if(typeof data === 'string'){
        ctx[data] = resolverRecursive(info.fieldNodes, data);
        const fields = ctx[data].map(field => pluralize(data) + '.' + field);
        ctx[data] = manyToOneLoader(fields, pluralize(data));
    } else {
        if(!ctx[data[0]]){
            ctx[data[0]] = resolverRecursive(info.fieldNodes, data[0]);
            const fields = ctx[data[0]].map(field => data[0] + '.' + field);
            ctx[data[0]] = oneToManyLoader(fields, data[0], data[1]);
        } 
    }
});

export const ResolvePropertyCount = createParamDecorator((data, [root, args, ctx, info]) => {
    if(!ctx[data[0]]){
        const tableName = data[0].replace('Count','');
        ctx[data[0]] = oneToManyCountLoader(tableName, data[1]);
    } else {

    }
});

function resolverRecursive(resolver: any, field: string){
	for(var i = 0; i < resolver.length; i++){
		if(resolver[i].selectionSet) {
			if(resolver[i].name.value === field){
				const result = ['id'];
				resolver[i].selectionSet.selections.forEach(item => item.selectionSet || result.push(item.name.value));
				return result.filter(item => !(item.endsWith('Count') || item === '__typename'));
			} else {
				return resolverRecursive(resolver[i].selectionSet.selections, field);
			}
		}
	}
}