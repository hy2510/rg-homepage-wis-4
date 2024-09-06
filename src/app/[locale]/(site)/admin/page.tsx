'use client'

import Link from "next/link";
import style from "./page.module.scss";
import Image from "next/image";
import { useSiteBlueprint } from "@/app/_context/CustomerContext";
import NoticeBoardList from "../home/main/_cpnt/NoticeBoardList";
import TabNavBar from "@/ui/common/TabNavBar";
import { Nav, NavItem } from "@/ui/common/common-components";

export default function Page({searchParams}: { searchParams: { page: string }}) {

  const { customLogo } = useSiteBlueprint()
  const page = searchParams.page ? Number(searchParams.page) : 1

  return (
    <>
      <div className={style.admin_header}>
        <div className={`container ${style.container}`}>
          <div className={style.logo}>
            {customLogo ? (
              <Image
                alt=""
                src={customLogo}
                width={240}
                height={80}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '250px',
                  maxHeight: '52px',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  padding: '2.5px 5px',
                  display: 'block',
                }}
              />
            ) : (
              <Image
                alt=""
                src="/src/images/@global-header/company_logo_white.svg"
                width={48}
                height={40}
                style={{ display: 'block' }}
              />
            )}
          </div>
          <div className={style.link_group}>
            <div className={style.link}>Access Admin Site</div>
            <div className={style.link}>Logout</div>
          </div>
        </div>
      </div>
      {/* <TabNavBar></TabNavBar> */}
      <main className="container">
        <div className={style.admin}>
          <Nav>
            <NavItem active={true}>공지</NavItem>
            <NavItem active={false}>갤러리</NavItem>
          </Nav>
          <div className={style.board}>
            <NoticeBoardList page={page}  />
          </div>
        </div>
      </main>
    </>
  );
}
