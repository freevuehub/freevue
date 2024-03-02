'use server'
import type { NextPage } from 'next'
import type { NextProps } from '~/types'

type Props = {} & NextProps

const About: NextPage<Props> = async (props) => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <h1 className="text-primary text-[30px] font-taebaek">해당 페이지는 준비중입니다.</h1>
    </div>
  )
}

export default About
