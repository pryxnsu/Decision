import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

export default function Loader({ size = '8' }: { size: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spinner className={cn('', `size-${size}`)} />
        </div>
    );
}
