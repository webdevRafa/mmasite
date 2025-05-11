import { useInViewAnimation } from "../hooks/useInViewAnimation"

type Props = {
    userName?: string;
    text: string;
}

export const CommentCard: React.FC<Props> = ({ userName, text }) => {
    const { ref, isVisible } = useInViewAnimation();
    return (
    <div
      ref={ref}
      className={`subdarker p-3 rounded transition-all duration-700 ease-out 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
    >
      <p className="text-sm text-gray-400">{userName} said:</p>
      <p className="text-white">{text}</p>
    </div>
  );
}