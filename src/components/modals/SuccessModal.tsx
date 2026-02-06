import React from 'react'
import { Button } from '@/components/ui/Button'

interface SuccessModalProps {
  isOpen: boolean
  onReset: () => void
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onReset }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onReset} />
      <div className="relative z-10 bg-white rounded-xs shadow-xl p-8 min-w-75 text-center">
        <h2 className="text-3xl mb-6">Success</h2>
        <Button type="button" onClick={onReset} variant="primary">
          Reset form
        </Button>
      </div>
    </div>
  )
}
