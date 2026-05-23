import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  lectureSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Cụm 1: Giới thiệu Software Architecture',
      link: {type: 'doc', id: '01-introduction/01-overview'},
      collapsed: false,
      items: [
        '01-introduction/01-overview',
        '01-introduction/02-what-is-software-architecture',
        '01-introduction/03-aims-and-outcomes',
        '01-introduction/04-roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 2: Design Principles (SOLID)',
      link: {type: 'doc', id: '02-design-principles/01-overview'},
      collapsed: false,
      items: [
        '02-design-principles/01-overview',
        '02-design-principles/02-cohesion-and-coupling',
        '02-design-principles/03-srp',
        '02-design-principles/04-ocp',
        '02-design-principles/05-lsp',
        '02-design-principles/06-isp',
        '02-design-principles/07-dip',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 3: Architectural Thinking',
      link: {type: 'doc', id: '03-architectural-thinking/01-overview'},
      collapsed: false,
      items: [
        '03-architectural-thinking/01-overview',
        '03-architectural-thinking/02-architecture-vs-design',
        '03-architectural-thinking/03-tradeoffs-analysis',
        '03-architectural-thinking/04-modularity',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 4: Quality Attributes',
      link: {type: 'doc', id: '04-quality-attributes/01-overview'},
      collapsed: false,
      items: [
        '04-quality-attributes/01-overview',
        '04-quality-attributes/02-functional-vs-nfr',
        '04-quality-attributes/03-identifying-characteristics',
        '04-quality-attributes/04-component-based-thinking',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 5: Fundamental Architecture Styles',
      link: {type: 'doc', id: '05-fundamental-styles/01-overview'},
      collapsed: false,
      items: [
        '05-fundamental-styles/01-overview',
        '05-fundamental-styles/02-monolithic-vs-distributed',
        '05-fundamental-styles/03-layered-architecture',
        '05-fundamental-styles/04-pipeline-architecture',
        '05-fundamental-styles/05-microkernel-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 6: Distributed Architecture Styles',
      link: {type: 'doc', id: '06-distributed-styles/01-overview'},
      collapsed: false,
      items: [
        '06-distributed-styles/01-overview',
        '06-distributed-styles/02-service-based',
        '06-distributed-styles/03-microservices',
        '06-distributed-styles/04-event-driven',
        '06-distributed-styles/05-space-based',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 7: Documenting Architecture',
      link: {type: 'doc', id: '07-documenting/01-overview'},
      collapsed: false,
      items: [
        '07-documenting/01-overview',
        '07-documenting/02-module-views',
        '07-documenting/03-component-connector-views',
        '07-documenting/04-allocation-views',
      ],
    },
    {
      type: 'category',
      label: 'Cụm 8: Case Studies',
      link: {type: 'doc', id: '08-case-studies/01-overview'},
      collapsed: false,
      items: [
        '08-case-studies/01-overview',
        '08-case-studies/02-uams-academic-management',
        '08-case-studies/03-smart-city-traffic',
        '08-case-studies/05-production-ml-feature-store',
        '08-case-studies/04-exercise-set',
      ],
    },
    {
      type: 'category',
      label: 'Tài nguyên',
      collapsed: true,
      items: [
        'resources/course-summary',
        'resources/glossary',
        'resources/cross-reference',
        'resources/content-review-ds',
        'resources/data-scientist-learning-path',
        'resources/pdfs',
        'resources/exam-checklist',
      ],
    },
  ],
};

export default sidebars;
