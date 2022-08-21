import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  width: 100%;
  .header__main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    height: 70px;
    padding: 10px 50px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    .tit__header {
      font-size: 40px;
    }
  }
  .wrapper__content {
    display: flex;
    margin-top: 70px;
    position: relative;
    z-index: 10;
    .nav__sidebar {
      padding: 50px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #455573;
      width: 200px;
      .list__sidebar {
        li {
          &:first-child {
            margin: 0;
          }
          margin: 20px 0;
          a {
            color: #455573;
            text-decoration: none;
          }
        }
      }
    }
    .section__content {
      padding: 50px;
    }
  }
`;

const Layout = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>RW</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <main>
        <header className="header__main">
          <h1 className="tit__header">RW</h1>
        </header>
        <div className="wrapper__content">
          <aside className="nav__sidebar">
            <ul className="list__sidebar">
              <li>
                <Link href="/members" passHref>
                  멤버
                </Link>
              </li>
              <li>
                <Link href="/schedule" passHref>
                  일정체크
                </Link>
              </li>
              <li>
                <Link href="/upload" passHref>
                  악보 올리기
                </Link>
              </li>
              <li>
                <Link href="/search" passHref>
                  악보 검색
                </Link>
              </li>
            </ul>
          </aside>
          <section className="section__content">{children}</section>
        </div>
      </main>

      <footer></footer>
    </LayoutWrapper>
  );
};

export default Layout;
