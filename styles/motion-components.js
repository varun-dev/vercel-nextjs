import { AnimatePresence, motion } from 'framer-motion'
import { RowTodo } from './styled-components'

export const RowTodoMotion = ({ deleted, children }) => (
  <AnimatePresence>
    {!deleted && (
      <motion.div
        initial={{ rotateX: -90, height: 0 }}
        animate={{ rotateX: 0, height: 50 }}
        transition={{ duration: 0.3, type: 'easeOut' }}
        exit={{ rotateX: 90, height: 0 }}>
        <RowTodo>{children}</RowTodo>
      </motion.div>
    )}
  </AnimatePresence>
)
