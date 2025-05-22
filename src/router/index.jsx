import { Router, RouterView } from 'speedy-jsx'
import HelloWorld from '../views/HelloWorld'
import MainLayout from '../layouts/MainLayout'
import DynamicAttributes from '../views/DynamicAttributes'
import Home from '../views/Home'
import StylingDemo from '../views/StylingDemo'
import NestedComponents from '../views/NestedComponents'
import ReactiveAssignments from '../views/ReactiveAssignments'
import ReactiveDeclarations from '../views/ReactiveDeclarations'
import ReactiveStatements from '../views/ReactiveStatements'
import DeclaringProps from '../views/DeclaringProps'
import DefaultPropsDemo from '../views/DefaultProps'
import SpreadPropsDemo from '../views/SpreadProps'
import IfBlocksDemo from '../views/IfBlocks'
import ElseIfBlocksDemo from '../views/ElseIfBlocks'
import EachBlocksDemo from '../views/EachBlocks'
import DomEventsDemo from '../views/DomEvents'
import ComponentEventsDemo from '../views/ComponentEvents'
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    component: MainLayout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'hello',
        component: HelloWorld,
        meta: {
          title: 'Hello World'
        }
      },
      {
        path: 'dynamic',
        component: DynamicAttributes,
        meta: {
          title: '动态属性示例'
        }
      },
      {
        path: 'styling',
        component: StylingDemo,
        meta: {
          title: '样式示例'
        }
      },
      {
        path: 'nested',
        component: NestedComponents,
        meta: {
          title: '嵌套组件示例'
        }
      },
      {
        path: 'reactive',
        component: ReactiveAssignments,
        meta: {
          title: '响应式赋值'
        }
      },
      {
        path: 'declaration',
        component: ReactiveDeclarations,
        meta: {
          title: '响应式声明'
        }
      },
      {
        path: 'statement',
        component: ReactiveStatements,
        meta: {
          title: '响应式语句'
        }
      },
      {
        path: 'props',
        component: DeclaringProps,
        meta: {
          title: '声明Props'
        }
      },
      {
        path: 'defaults',
        component: DefaultPropsDemo,
        meta: {
          title: 'Props默认值'
        }
      },
      {
        path: 'spread',
        component: SpreadPropsDemo,
        meta: {
          title: '展开Props'
        }
      },
      {
        path: 'if-blocks',
        component: IfBlocksDemo,
        meta: {
          title: '条件渲染'
        }
      },
      {
        path: 'else-if-blocks',
        component: ElseIfBlocksDemo,
        meta: {
          title: 'else-if 条件渲染'
        }
      },
      {
        path: 'for-blocks',
        component: EachBlocksDemo,
        meta: {
          title: '循环渲染'
        }
      },
      {
        path: 'dom-events',
        component: DomEventsDemo,
        meta: {
          title: 'DOM事件'
        }
      },
      {
        path: 'component-events',
        component: ComponentEventsDemo,
        meta: {
          title: '组件事件'
        }
      }
    ]
  }
]

export function SetupRouter() {
  return () => (
    <Router routes={routes}>
      <RouterView />
    </Router>
  )
}
