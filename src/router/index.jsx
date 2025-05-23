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
import DomEventForwardingDemo from '../views/DomEventForwarding'
import TextInputsDemo from '../views/TextInputs'
import NumericInputsDemo from '../views/NumericInputs'
import CheckboxInputsDemo from '../views/CheckboxInputs'
import GroupInputsDemo from '../views/GroupInputs'
import TextareaInputsDemo from '../views/TextareaInputs'
import FileInputs from '../views/FileInputs'
import SelectBindings from '../views/SelectBindings'
import MediaElements from '../views/MediaElements'
import Not from '../views/Not'
import Dimensions from '../views/Dimensions'
import BindThis from '../views/BindThis'
import OnMount from '../views/OnMount'
import NextTick from '../views/NextTick'
import WritableStores from '../views/WritableStores'
import SvgClock from '../views/SvgClock'
import CustomActions from '../views/CustomActions'
import AddingParametersToActions from '../views/AddingParametersToActions'
import ActionsPannable from '../views/ActionsPannable'
import ClassesDemo from '../views/ClassesDemo'
import ClassShorthandDemo from '../views/ClassShorthandDemo'

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
      },
      {
        path: 'dom-event-forwarding',
        component: DomEventForwardingDemo,
        meta: {
          title: 'DOM事件转发'
        }
      },
      {
        path: 'text-inputs',
        component: TextInputsDemo,
        meta: {
          title: '文本输入'
        }
      },
      {
        path: 'numeric-inputs',
        component: NumericInputsDemo,
        meta: {
          title: '数字输入'
        }
      },
      {
        path: 'checkbox-inputs',
        component: CheckboxInputsDemo,
        meta: {
          title: '复选框输入'
        }
      },
      {
        path: 'group-inputs',
        component: GroupInputsDemo,
        meta: {
          title: '组选输入'
        }
      },
      {
        path: 'textarea-inputs',
        component: TextareaInputsDemo,
        meta: {
          title: '多行文本输入'
        }
      },
      {
        path: 'file-inputs',
        component: FileInputs,
        meta: {
          title: '文件输入'
        }
      },
      {
        path: 'select-bindings',
        component: SelectBindings,
        meta: {
          title: '下拉选择绑定'
        }
      },
      {
        path: 'media-elements',
        component: MediaElements,
        meta: {
          title: '媒体元素绑定'
        }
      },
      {
        path: 'dimensions',
        component: Dimensions,
        meta: {
          title: '尺寸示例'
        }
      },
      {
        path: 'bind-this',
        component: BindThis,
        meta: {
          title: '绑定 this'
        }
      },
      {
        path: 'on-mount',
        component: OnMount,
        meta: {
          title: '生命周期钩子'
        }
      },
      {
        path: 'next-tick',
        component: NextTick,
        meta: {
          title: 'nextTick'
        }
      },
      {
        path: 'stores',
        component: WritableStores,
        meta: {
          title: '状态管理'
        }
      },
      {
        path: 'svg-clock',
        component: SvgClock,
        meta: {
          title: 'SVG时钟'
        }
      },
      {
        path: 'custom-actions',
        component: CustomActions,
        meta: {
          title: '自定义指令'
        }
      },
      {
        path: 'action-params',
        component: AddingParametersToActions,
        meta: {
          title: '向指令添加参数'
        }
      },
      {
        path: 'action-pannable',
        component: ActionsPannable,
        meta: {
          title: 'Actions Pannable'
        }
      },
      {
        path: 'classes',
        component: ClassesDemo,
        meta: {
          title: '类样式指令'
        }
      },
      {
        path: 'class-shorthand',
        component: ClassShorthandDemo,
        meta: {
          title: '类样式简写'
        }
      }
    ]
  },
  {
    path: '/404',
    component: Not,
    meta: {
      title: '404'
    }
  }
]

export function SetupRouter() {
  return () => (
    <Router routes={routes}>
      <RouterView />
    </Router>
  )
}
