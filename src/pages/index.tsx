import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link
            className={`button button--primary button--lg ${styles.heroButton}`}
            to="/docs/intro">
            Bắt đầu đọc
          </Link>
          <Link
            className={`button button--secondary button--lg ${styles.heroButton}`}
            to="/docs/01-introduction/01-overview">
            Vào Cụm 1
          </Link>
        </div>
      </div>
    </header>
  );
}

type LectureCardProps = {
  number: string;
  title: string;
  description: string;
  to: string;
  status?: 'ready' | 'wip';
};

function LectureCard({number, title, description, to, status = 'ready'}: LectureCardProps): ReactNode {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardNumber}>{number}</div>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      <span className={status === 'ready' ? styles.badgeReady : styles.badgeWip}>
        {status === 'ready' ? 'Hoàn thành' : 'Đang biên soạn'}
      </span>
    </Link>
  );
}

function LectureGrid(): ReactNode {
  return (
    <section className={styles.gridSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Tám cụm bài giảng
        </Heading>
        <p className={styles.sectionSubtitle}>
          Lộ trình từ nguyên lý thiết kế cơ bản tới các kiến trúc phân tán hiện đại và cách tài liệu hoá architecture cho team.
        </p>
        <div className={styles.grid}>
          <LectureCard
            number="01"
            title="Giới thiệu Software Architecture"
            description="Software Architecture là gì, vì sao học, mục tiêu khoá, lộ trình đọc tài liệu."
            to="/docs/01-introduction/01-overview"
            status="ready"
          />
          <LectureCard
            number="02"
            title="Design Principles (SOLID)"
            description="Cohesion/coupling cùng năm nguyên lý SOLID: SRP, OCP, LSP, ISP, DIP, kèm anti-pattern và refactor."
            to="/docs/02-design-principles/01-overview"
            status="ready"
          />
          <LectureCard
            number="03"
            title="Architectural Thinking"
            description="Architecture vs Design, phân tích trade-off đa chiều, modularity và separation of concerns ở mức kiến trúc."
            to="/docs/03-architectural-thinking/01-overview"
            status="ready"
          />
          <LectureCard
            number="04"
            title="Quality Attributes"
            description="Functional vs Non-functional, xác định architecture characteristics, ATAM mini và component-based thinking."
            to="/docs/04-quality-attributes/01-overview"
            status="ready"
          />
          <LectureCard
            number="05"
            title="Fundamental Styles"
            description="Monolithic vs Distributed, Layered, Pipeline, Microkernel, bốn style nền tảng và khi nào dùng."
            to="/docs/05-fundamental-styles/01-overview"
            status="ready"
          />
          <LectureCard
            number="06"
            title="Distributed Styles"
            description="Service-based, Microservices, Event-Driven, Space-Based, bốn style phân tán phổ biến nhất."
            to="/docs/06-distributed-styles/01-overview"
            status="ready"
          />
          <LectureCard
            number="07"
            title="Documenting Architecture"
            description="Module views, Component-and-Connector views, Allocation views, ba góc nhìn chính khi tài liệu hoá."
            to="/docs/07-documenting/01-overview"
            status="ready"
          />
          <LectureCard
            number="08"
            title="Case Studies"
            description="UAMS (Academic Management), Smart City Traffic Detection, áp toàn bộ kiến thức vào case thực + bài tập."
            to="/docs/08-case-studies/01-overview"
            status="ready"
          />
        </div>
      </div>
    </section>
  );
}

function PhilosophySection(): ReactNode {
  return (
    <section className={styles.philosophy}>
      <div className="container">
        <blockquote className={styles.quote}>
          <p>
            <em>"Architecture represents the significant design decisions that shape a
            system, where significance is measured by cost of change."</em>
          </p>
          <footer>Grady Booch</footer>
        </blockquote>
        <p className={styles.philosophyText}>
          Tài liệu này dành nhiều tâm sức cho hai câu hỏi cốt lõi: làm thế nào để
          <strong> quyết định đúng những thứ khó sửa nhất </strong> trong một hệ phần mềm,
          và làm thế nào để <strong> truyền đạt quyết định đó </strong> cho team một cách
          rõ ràng. Hai câu hỏi đó dẫn tới hai mạch chính: <em>thiết kế</em> (SOLID,
          architecture styles, quality attributes) và <em>tài liệu hoá</em> (views,
          ADR, diagram chuẩn).
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline as string}>
      <HomepageHeader />
      <main>
        <LectureGrid />
        <PhilosophySection />
      </main>
    </Layout>
  );
}
