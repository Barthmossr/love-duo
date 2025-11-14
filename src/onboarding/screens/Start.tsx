import type { JSX } from 'react'
import { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'

import { Logo } from '@/components'
import { colors } from '@/theme/colors'

interface StartProps {
  navigation: {
    navigate: (route: string) => void
  }
}

const Start = ({ navigation }: StartProps): JSX.Element => {
  useEffect(() => {
    // System UI background can be adjusted when we add SystemUI API usage
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop: 64 }}>
      <Logo size={40} />
      <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
        <Text
          style={{ color: colors.textDark, fontSize: 28, fontWeight: '800' }}
        >
          Nossa História
        </Text>
        <Text style={{ color: colors.textDark, opacity: 0.8, marginTop: 8 }}>
          Um espaço especial para o casal
        </Text>
      </View>
      <View
        style={{
          marginTop: 24,
          marginHorizontal: 24,
          backgroundColor: colors.base,
          borderRadius: 24,
          padding: 16,
          shadowColor: '#000000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3
        }}
      >
        <Pressable
          testID="start-create"
          accessibilityRole="button"
          accessibilityLabel="Criar Novo Casal"
          onPress={() => navigation.navigate('CreateCouple')}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: colors.textOnPrimary, fontWeight: '700' }}>
              Criar Novo Casal
            </Text>
          </View>
        </Pressable>
        <Pressable
          testID="start-join"
          accessibilityRole="button"
          accessibilityLabel="Entrar com Código"
          onPress={() => navigation.navigate('PairCode')}
        >
          <View
            style={{
              backgroundColor: colors.neutral,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 12
            }}
          >
            <Text style={{ color: colors.textDark, fontWeight: '700' }}>
              Entrar com Código
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export { Start }
