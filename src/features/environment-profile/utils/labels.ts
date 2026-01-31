import { ResidenceType, LightDirection, ExperienceLevel } from '../types/environment';

export const getResidenceLabel = (type?: ResidenceType | string) => {
    switch (type) {
        case 'STUDIO': return '원룸';
        case 'APARTMENT': return '아파트';
        case 'HOUSE': return '주택';
        default: return type || '';
    }
};

export const getLightLabel = (dir?: LightDirection | string) => {
    switch (dir) {
        case 'NORTH': return '북향';
        case 'EAST': return '동향';
        case 'SOUTH': return '남향';
        case 'WEST': return '서향';
        case 'UNKNOWN': return '불명';
        default: return dir || '';
    }
};

export const getExperienceLabel = (level?: ExperienceLevel | string, full: boolean = false) => {
    switch (level) {
        case 'FIRST': return full ? '초보 (처음 키워봄)' : '초보';
        case 'FAILED': return full ? '초보 (사망 경험 있음)' : '초보';
        case 'SUCCESS': return full ? '경험자 (유지 경험 있음)' : '경험자';
        default: return level || '';
    }
};

export const getEnvironmentTag = (res: ResidenceType | string, light: LightDirection | string, exp: ExperienceLevel | string) => {
    return `${getResidenceLabel(res)}·${getLightLabel(light)}·${getExperienceLabel(exp)}`;
};
