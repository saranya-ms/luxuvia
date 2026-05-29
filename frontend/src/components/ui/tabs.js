import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export function Tabs({ defaultValue = 'overview', children }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, className = '', children, ...props }) {
  const context = useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      type="button"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => context?.setValue(value)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children }) {
  const context = useContext(TabsContext);
  if (context?.value !== value) return null;
  return <div className={className}>{children}</div>;
}
