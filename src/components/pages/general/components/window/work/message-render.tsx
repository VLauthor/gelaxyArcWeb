import { Message, User } from "./data/MessageData";
import { defUsers } from "./data/Users";
import Image from "next/image";

interface MessageRenderProps {
  message: Message
  getReplayMessage: (replyUid: number) => Message | null
  getUsersById: (userUid: number) => User | null
}

export default function MessageRender({ message, getReplayMessage, getUsersById }: MessageRenderProps) {
  const { id, detalic, text } = message
  const user = defUsers[18]
  let replyMessage: Message | null = null
  let userReply: User | null = null
  if (detalic.replyUid) {
    replyMessage = getReplayMessage(detalic.replyUid)
    if (replyMessage)
      userReply = getUsersById(replyMessage?.userUid)
  }

  const { images } = message.objects

  return < div
    key={id}
    className={`flex w-full h-fit items-end py-1 ${user.userUid === message.userUid ? "justify-end" : "justify-start"
      }`
    }
  >
    <div className="border-2 border-blue-600 font-medium rounded-b-0 rounded-t-lg rounded-r-lg overflow-hidden bg-blue-400">
      {

      }
      {replyMessage && (
        <div className="px-2 py-1 flex flex-col">
          <span>{userReply?.lastName + " " + userReply?.firstName}</span>
          <span>{replyMessage.text}</span>
        </div>
      )}
      {
        images &&
        <div className="flex">
          {images.map((image) => {
            const imageSrc = `/static/messages/image/${image}.jpg`
            return (<div key={image} className="">
              <Image src={imageSrc} alt="" width={250} height={100} />
            </div>)
          })}
        </div>
      }

      <div className="px-4 py-1.5 bg-blue-500 rounded-t-md">{text}</div>
    </div>
  </div >
}