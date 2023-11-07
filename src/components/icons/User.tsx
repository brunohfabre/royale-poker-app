import { Path, Svg } from 'react-native-svg'

export function User() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        stroke="#ADADAD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5M9 8.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
    </Svg>
  )
}
