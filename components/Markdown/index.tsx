import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import type { IChild } from '~/types'

type Props = {} & IChild

const MarkdownRender: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-[10px] mt-10">
      <Markdown
        rehypePlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')

            return match ? (
              <Prism language={match[1]} style={dracula} className="scroll-hidden">
                {String(children).replace(/\n$/, '')}
              </Prism>
            ) : (
              <code className="bg-content px-[8px] py-[2px] rounded-[5px] text-primary">
                {children}
              </code>
            )
          },
          p({ children }) {
            return <p className="dark:text-white text-[16px] leading-[24px]">{children}</p>
          },
          blockquote({ children }) {
            return <div className="bg-content p-[10px] rounded-[8px]">{children}</div>
          },
          h1({ children }) {
            return <h1 className="dark:text-white text-5xl mt-6 font-taebaek">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="dark:text-white text-4xl mt-6 font-taebaek">{children}</h2>
          },
          ul({ children }) {
            return (
              <ol className="dark:text-white pl-7 flex flex-col gap-1 list-disc">{children}</ol>
            )
          },
          ol({ children }) {
            return (
              <ol className="dark:text-white pl-7 flex flex-col gap-1 list-decimal">{children}</ol>
            )
          },
          li({ children }) {
            return (
              <li>
                <p className="dark:text-white text-[16px] leading-[24px]">{children}</p>
              </li>
            )
          },
        }}
      >
        {String(props.children)}
      </Markdown>
    </div>
  )
}

export default MarkdownRender
