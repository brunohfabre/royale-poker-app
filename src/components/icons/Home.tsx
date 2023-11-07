import { Path, Svg } from 'react-native-svg'

export function Home() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.25 6.75 9 1.5l6.75 5.25V15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75Z"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6.75 16.5V9h4.5v7.5"
      />
    </Svg>
  )
}
