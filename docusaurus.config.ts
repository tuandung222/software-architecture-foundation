import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Software Architecture Foundation',
  tagline: 'Tài liệu nền tảng về Kiến trúc Phần mềm: SOLID, Architecture Styles, Quality Attributes và Documenting Views',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://tuandung222.github.io',
  baseUrl: '/software-architecture-foundation/',

  organizationName: 'tuandung222',
  projectName: 'software-architecture-foundation',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
    localeConfigs: {
      vi: {label: 'Tiếng Việt', htmlLang: 'vi-VN'},
    },
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/tuandung222/software-architecture-foundation/edit/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true,
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'vi'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    navbar: {
      title: 'Software Architecture Foundation',
      logo: {
        alt: 'SAF Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'lectureSidebar',
          position: 'left',
          label: 'Bài giảng',
        },
        {
          to: '/docs/08-case-studies/01-overview',
          label: 'Case Studies',
          position: 'left',
        },
        {
          to: '/docs/resources/course-summary',
          label: 'Tóm tắt khoá',
          position: 'left',
        },
        {
          href: 'https://github.com/tuandung222/software-architecture-foundation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bài giảng',
          items: [
            {label: 'Giới thiệu', to: '/docs/intro'},
            {label: 'Cụm 1: Giới thiệu SA', to: '/docs/01-introduction/01-overview'},
            {label: 'Cụm 2: Design Principles', to: '/docs/02-design-principles/01-overview'},
            {label: 'Cụm 3: Architectural Thinking', to: '/docs/03-architectural-thinking/01-overview'},
            {label: 'Cụm 4: Quality Attributes', to: '/docs/04-quality-attributes/01-overview'},
            {label: 'Cụm 5: Fundamental Styles', to: '/docs/05-fundamental-styles/01-overview'},
            {label: 'Cụm 6: Distributed Styles', to: '/docs/06-distributed-styles/01-overview'},
            {label: 'Cụm 7: Documenting', to: '/docs/07-documenting/01-overview'},
            {label: 'Cụm 8: Case Studies', to: '/docs/08-case-studies/01-overview'},
          ],
        },
        {
          title: 'Tài nguyên',
          items: [
            {label: 'PDF giảng', to: '/docs/resources/pdfs'},
            {label: 'Thuật ngữ', to: '/docs/resources/glossary'},
            {label: 'Cross-reference', to: '/docs/resources/cross-reference'},
            {label: 'Tóm tắt khoá', to: '/docs/resources/course-summary'},
          ],
        },
        {
          title: 'Liên kết',
          items: [
            {
              label: 'GitHub repo',
              href: 'https://github.com/tuandung222/software-architecture-foundation',
            },
            {
              label: 'License (CC BY 4.0)',
              href: 'https://creativecommons.org/licenses/by/4.0/',
            },
          ],
        },
      ],
      copyright: `Bản quyền © ${new Date().getFullYear()} Software Architecture Foundation. Nội dung phát hành theo CC BY 4.0. Trang web xây dựng bằng Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['c', 'cpp', 'bash', 'sql', 'python', 'java', 'json', 'typescript', 'yaml', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
